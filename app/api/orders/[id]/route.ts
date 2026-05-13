import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await props.params;
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: "Missing status field" }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
