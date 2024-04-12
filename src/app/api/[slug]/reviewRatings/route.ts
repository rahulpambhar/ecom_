import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { unlink } from "fs/promises";
import { parse } from "url";
import { StatusCodes } from 'http-status-codes';
import { getProduct, getCart, getCartItem } from "../utils";
import authOptions from "../../auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import prisma from "../../../../../prisma/prismaClient";


export async function POST(request: Request) {
    try {
        let session: any = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({
                st: false,
                data: [],
                msg: "You are not logged in",
            });
        }
        const body = await request.json();
        const { review, ratings, id } = body.payload

        const isReview = await prisma.review.findFirst({
            where: {
                userId: session?.user?.id,
                productId: id,
            }
        })

        if (!isReview) {
            const res = await prisma.review.create({
                data: {
                    review,
                    rating: +ratings,
                    userId: session?.user?.id,
                    productId: id,
                    createdBy: session?.user?.id,
                    updatedBy: session?.user?.id,
                }
            })
        } else {
            const res = await prisma.review.update({
                where: {
                    id: isReview.id
                },
                data: {
                    review,
                    rating: +ratings,
                    updatedBy: session?.user?.id,
                }
            })
        }

        const getReviews = await prisma.review.findMany({
            where: {
                productId: id,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json({
            st: true,
            statusCode: StatusCodes.OK,
            data: getReviews,
            msg: "Thank you for your review.",
        });

    } catch (error) {
        console.log('error::: ', error);
        return NextResponse.json({
            st: false,
            data: [],
            error,
            msg: "something went wrong!!",
        });
    }
}

import { Prisma } from '@prisma/client';


type ReviewQuery = Prisma.ReviewGroupByArgs & {
    include: {
        user: boolean;

    };
};

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

        const { query }: any = parse(request.url, true);
        let { id, }: any = query;

        const getReviews: any = await prisma.review.findMany({
            where: {
                productId: id,
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: { name: true, profile_pic: true }
            } as any
        });

        const totalRatings = getReviews.reduce((acc: number, review: any) => acc + (review.rating || 0), 0);
        // const data =
        //     getReviews = getReviews.length > 0 ? totalRatings / getReviews.length : 0

        return NextResponse.json({
            st: true, statusCode: StatusCodes.OK, data: getReviews, msg: "review list fetch.",
        });

    } catch (error) {
        console.log('error::: ', error);
        return NextResponse.json({ st: false, statusCode: StatusCodes.BAD_REQUEST, error, msg: "something went wrong!!", });
    }
}