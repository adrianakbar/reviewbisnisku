import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = (session.user as any).isAdmin;

    const orders = await prisma.order.findMany({
      where: isAdmin ? undefined : { userId: (session.user as any).id },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Allow anonymous orders if they don't have an account, or enforce login
    let userId = null;
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email }
      });
      if (user) {
        userId = user.id;
      }
    }

    const formData = await req.formData();
    
    const businessName = formData.get('businessName') as string;
    const mapsUrl = formData.get('mapsUrl') as string;
    const reviewsCount = formData.get('reviewsCount') as string;
    const targetStar = formData.get('targetStar') as string;
    const notes = formData.get('notes') as string;
    const totalPrice = formData.get('totalPrice') as string;
    const customerWa = formData.get('customerWa') as string | null;

    if (!businessName || !mapsUrl || !reviewsCount || !totalPrice) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Process images
    const imagesPaths: string[] = [];
    const files = formData.getAll('images') as File[];
    
    if (files && files.length > 0) {
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (err) {
        // ignore if exists
      }
      
      for (const file of files) {
        if (file && file.name) {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const ext = path.extname(file.name);
          const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
          const filepath = path.join(uploadDir, uniqueFilename);
          await writeFile(filepath, buffer);
          imagesPaths.push(`/uploads/${uniqueFilename}`);
        }
      }
    }

    const newOrder = await prisma.order.create({
      data: {
        userId,
        businessName,
        mapsUrl,
        reviewsCount: parseInt(reviewsCount),
        targetStar: parseInt(targetStar) || 5,
        notes,
        totalPrice: parseInt(totalPrice),
        status: "Pending",
        customerWa,
        images: imagesPaths
      }
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
