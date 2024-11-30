"use server";

import { prismaClient } from "@/lib/prisma.client";
import { getDateId } from "@/lib/utils";
import { VisitedPageSchema, VisitSchema } from "@/schemas/visitSchema";
import { z } from "zod";



export const addVisite = async (visitData: z.infer<typeof VisitSchema>) => {
      try {
        const res = await prismaClient.visit.create({
          data: {
            ...visitData,
            dateID: getDateId(),
          },
          select: {
            id: true,
          }
        });
        return res.id;
      } catch (error) {
        console.error("Database Error:", error);
        return ""
      }
};

export const addVisitedPage = async (visitedPageData: z.infer<typeof VisitedPageSchema>) => {
    try {
      const res = await prismaClient.visitedPage.create({
        data: {
          ...visitedPageData,
        },
        select: {
          id: true,
        },
      });
      return res.id;
    } catch (error) {
      console.error("Database Error:", error);
      return "";
    }
}