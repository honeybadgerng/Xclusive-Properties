import dbConnect from "@/utils/dbConnect";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();

    // 🔥 Populate user
    const prop = (await Property.findOne({ slug: params.slug })
      .populate("user")
      .lean()) as any;

    if (!prop) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // 👤 Extract agent/user info
    const user = prop.user;
    const agent = {
      name: user.name,
      phone: user.phone,
      whatsapp: user.whatsapp,
      email: user.email,
      image: user.profileImage,
      company: user.companyName,
    };

    // 🧾 Return property + agent
    return NextResponse.json({
      ...prop,
      agent,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch property" },
      { status: 500 }
    );
  }
}
