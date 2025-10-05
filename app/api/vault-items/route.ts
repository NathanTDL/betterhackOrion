import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { vaultItems } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, desc, isNull, or } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    // Get authenticated user (optional for now)
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Allow fetching without authentication for demo purposes
    const userId = session?.user?.id || null;

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const category = searchParams.get("category");

    // Build query - if userId is null, get all items with null userId
    // if userId exists, get items for that user OR null (for demo purposes, show all)
    let query = db
      .select()
      .from(vaultItems)
      .where(
        userId 
          ? or(eq(vaultItems.userId, userId), isNull(vaultItems.userId))
          : isNull(vaultItems.userId)
      )
      .orderBy(desc(vaultItems.createdAt));

    // Execute query
    const items = await query;

    // Filter by type or category if provided
    let filteredItems = items;
    if (type) {
      filteredItems = filteredItems.filter((item) => item.type === type);
    }
    if (category) {
      filteredItems = filteredItems.filter((item) => item.category === category);
    }

    return NextResponse.json({
      success: true,
      items: filteredItems,
      count: filteredItems.length,
    });
  } catch (error) {
    console.error("Error fetching vault items:", error);
    return NextResponse.json(
      { error: "Failed to fetch vault items" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Get authenticated user (optional for now)
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Allow deleting without authentication for demo purposes
    const userId = session?.user?.id || null;

    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("id");

    if (!itemId) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    // Delete the item (only if it belongs to the user)
    await db
      .delete(vaultItems)
      .where(eq(vaultItems.id, itemId));

    return NextResponse.json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting vault item:", error);
    return NextResponse.json(
      { error: "Failed to delete vault item" },
      { status: 500 }
    );
  }
}
