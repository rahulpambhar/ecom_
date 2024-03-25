import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { unlink } from "fs/promises";
import { parse } from "url";
import { StatusCodes } from 'http-status-codes';
import { getProduct, getCart, getNextInvoice, activityLog, getOrders } from "../../utils";
import authOptions from "../../../auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import prisma from "../../../../../../prisma/prismaClient";


export async function POST(request: Request) {
    try {
        const body = await request.json();

        const isTempOrder: any = await prisma.tempOrder.findFirst({
            where: {
                id: body.tempId,
                isBlocked: false
            }
        })

        let session: any = await getServerSession(authOptions);
        if (!session) { return NextResponse.json({ st: false, statusCode: StatusCodes.BAD_REQUEST, data: [], msg: "You are not logged in", }); }

        let cart: any = await getCart(session?.user?.id)
        if (!cart) { return NextResponse.json({ st: false, statusCode: StatusCodes.BAD_REQUEST, data: [], msg: "Cart is empty", }); }

        const nextInvoice = await getNextInvoice("order")
        const CartItem = cart?.CartItem

        let itemCount: number = 0
        let totalAmt: number = 0
        let discountAmount: number = 0;
        let taxableAmount: number = 0
        let GST = 18 //  default percentage, do it dynamic according to tax
        let netAmount: number = 0

        for (let x in CartItem) {

            const qty = CartItem[x]?.qty
            const price = CartItem[x].product?.price
            const total = qty * price
            const discount = CartItem[x].product?.discount

            if (CartItem[0].product.DiscountType === "PERCENTAGE") {
                discountAmount += total * discount / 100
            } else {
                discountAmount += qty * CartItem[0].product?.discount
            }
            totalAmt += total;
            itemCount += qty
        }

        taxableAmount = totalAmt - discountAmount
        GST = (GST * taxableAmount) / 100

        netAmount = taxableAmount + GST

        const data: any = {
            invoiceNo: nextInvoice,
            invoiceDate: new Date(),

            itemCount,

            total: totalAmt,
            discountAmount,
            taxableAmount,
            tax: GST,
            otherCharge: 0,
            netAmount,

            isPaid: true,
            paidAt: new Date(),
            payStatus: "SUCCESS",
            paymentDetail: "paayment done",
            paymentMethod: "online",

            isDelivered: false,
            deliveredAt: new Date(),
            deliveryAddress: "abc",

            cart: { connect: { id: cart.id } },
            user: { connect: { id: session?.user?.id } },
            Transport: { connect: { id: "65f67705f6a5e7edc22123e4" } },
        }

        const itemData: any = []

        for (let x in CartItem) {
            itemData.push({
                qty: CartItem[x].qty,
                price: CartItem[x].product.price,
                netAmount: CartItem[x].qty * CartItem[x].product.price,
                createdBy: session?.user?.id
            })
        }


        let createOrder: any = null;
        if (isTempOrder?.netAmount === netAmount) {
            createOrder = await prisma.order.create({ data })
        }

        if (!createOrder) {
            return NextResponse.json({ st: false, statusCode: StatusCodes.BAD_REQUEST, data: [], msg: "order created unsuccess!", });
        }


        // await prisma.order.deleteMany({})
        // await prisma.order.deleteMany({})
        // await prisma.tempOrder.deleteMany({})
        // await prisma.tempOrderItem.deleteMany({})

        const createItem = await prisma.orderItem.createMany({
            data: itemData.map((item: any) =>
            ({
                ...item,
                orderId: createOrder.id,
                productId: createOrder.id,
            }))
        })

        const blockTemp: any = await prisma.tempOrder.update({
            where: {
                id: body.tempId
            },
            data: {
                isBlocked: true,
                updatedBy: session?.user?.id,
                tempOrderItem: {
                    updateMany: {
                        where: {
                            tempOrderId: body.tempId
                        },
                        data: {
                            isBlocked: true,
                            updatedBy: session?.user?.id
                        }
                    }
                }
            }
        })

        await activityLog("INSERT", "order", data, session?.user?.id);
        return NextResponse.json({ st: true, statusCode: StatusCodes.OK, data: [], msg: "order created successfully!" });

    } catch (error) {
        console.log('error::: ', error);
        return NextResponse.json({ st: false, statusCode: StatusCodes.INTERNAL_SERVER_ERROR, data: [], error, msg: "something went wrong!!" });
    }
}

export async function GET(request: Request) {
    try {
        let session: any = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({
                st: false,
                data: [],
                msg: "You are not logged in",
            });
        }

        const isOrders = await getOrders(session?.user?.id)
        for(let x in isOrders){
            console.log('isOrders[x]::: ', isOrders[x].OrderItem);
        }

        return NextResponse.json({
            st: true,
            statusCode: StatusCodes.OK,
            data: [],
            msg: "order ferch success!",
        });

    } catch (error) {
        console.log('error::: ', error);
        return NextResponse.json({
            st: false,
            statusCode: StatusCodes.BAD_REQUEST,
            error,
            msg: "something went wrong!!",
        });
    }
}