import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { todoInput } from "~/types";

export const todoRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const todos: { id: string; text: string; done: boolean }[] =
      await ctx.db.todo.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });
    console.log(
      "todos from prisma: ",
      todos.map(({ id, text, done }) => ({ id, text, done })),
    );
    return [
      { id: "fake", text: "fake text", done: false },
      { id: "fake2", text: "fake text2", done: true },
    ];
  }),

  create: protectedProcedure
    .input(todoInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.todo.create({
        data: {
          text: input,
          user: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.todo.delete({
        where: { id: input },
      });
    }),

  toggle: protectedProcedure
    .input(z.object({ id: z.string(), done: z.boolean() }))
    .mutation(async ({ ctx, input: { id, done } }) => {
      return ctx.db.todo.update({
        where: { id },
        data: { done },
      });
    }),
});
