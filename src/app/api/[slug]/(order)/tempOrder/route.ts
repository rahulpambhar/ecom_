import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { unlink } from "fs/promises";
import { parse } from "url";
import { StatusCodes } from 'http-status-codes';
import { getProduct, getCart, getNextInvoice, activityLog } from "../../utils";
import authOptions from "../../../auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import prisma from "../../../../../../prisma/prismaClient";


export async function POST(request: Request) {
    try {

        let session: any = await getServerSession(authOptions);
        if (!session) { return NextResponse.json({ st: false, statusCode: StatusCodes.BAD_REQUEST, data: [], msg: "You are not logged in", }); }

        const body = await request.json();
        const { orderID } = body
        let nextInvoice: string = ""
        let items: any = []
        let cart: any = {}
        let order: any = {}

        let itemCount: number = 0
        let totalAmt: number = 0
        let discountAmount: number = 0;
        let taxableAmount: number = 0
        let GST = 18 //  default percentage, do it dynamic according to tax
        let netAmount: number = 0

        if (orderID) {

             order = await prisma.order.findFirst({
                where: {
                    id: orderID
                },
                include: {
                    OrderItem: {
                        include: {
                            product: true
                        }
                    }
                }
            })

            if (!order) {
                return NextResponse.json({ st: false, statusCode: StatusCodes.BAD_REQUEST, data: [], msg: "Order not found", });
            }

            nextInvoice = await getNextInvoice("tempOrder")
            items = order?.OrderItem
        } else {
            cart = await getCart(session?.user?.id)
            if (!cart) { return NextResponse.json({ st: false, statusCode: StatusCodes.BAD_REQUEST, data: [], msg: "Cart is empty", }); }

            nextInvoice = await getNextInvoice("tempOrder")
            items = cart?.CartItem
        }

        for (let x in items) {
            const qty = items[x]?.qty
            const price = items[x].product?.price
            const total = qty * price
            const discount = items[x].product?.discount

            if (items[0].product.DiscountType === "PERCENTAGE") {
                discountAmount += total * discount / 100
            } else {
                discountAmount += qty * items[0].product?.discount
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

            cart: orderID ? { connect: { id: order?.cartId } } : { connect: { id: cart?.id } },
            user: { connect: { id: session?.user?.id } },
            Transport: { connect: { id: "65f67705f6a5e7edc22123e4" } },
            createdBy: session?.user?.id
        }


        const itemData: any = []

        for (let x in items) {
            itemData.push({
                qty: items[x].qty,
                price: items[x].product.price,
                netAmount: items[x].qty * items[x].product.price,
                createdBy: session?.user?.id
            })
        }

        const createTemp = await prisma.tempOrder.create({ data })

        if (!createTemp) {
            return NextResponse.json({ st: false, statusCode: StatusCodes.BAD_REQUEST, data: [], msg: "order created unsuccess!", });
        }

        const createTempItem = await prisma.tempOrderItem.createMany({
            data: itemData.map((item: any) =>
            ({
                ...item,
                tempOrderId: createTemp.id,
                productId: createTemp.id,
            }))
        })

        await activityLog("INSERT", "tempOrder", data, session?.user?.id);
        return NextResponse.json({ st: true, statusCode: StatusCodes.OK, data: [], msg: "order created successfully!", temOrdrId: createTemp.id });

    } catch (error) {
        console.log('error::: ', error);
        return NextResponse.json({ st: false, statusCode: StatusCodes.INTERNAL_SERVER_ERROR, data: [], error, msg: "something went wrong!!" });
    }
}

// export async function GET(request: Request) {
//     try {
//         let session: any = await getServerSession(authOptions);

//         if (!session) {
//             return NextResponse.json({
//                 st: false,
//                 data: [],
//                 msg: "You are not logged in",
//             });
//         }

//         const isCart = await getCart(session?.user?.id)

//         return NextResponse.json({
//             st: true,
//             statusCode: StatusCodes.OK,
//             data: isCart,
//             msg: "Cart updated!",
//         });

//     } catch (error) {
//         console.log('error::: ', error);
//         return NextResponse.json({
//             st: false,
//             statusCode: StatusCodes.BAD_REQUEST,
//             error,
//             msg: "something went wrong!!",
//         });
//     }
// }