import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/db/db";
import User from "@/models/userModel";
import { sendVerified } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  await ConnectDB();

  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ error: "Token is not provided" }, { status: 400 });
  }

  const user = await User.findOne({
    VerifyToken: token,
    VerifyExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  user.isVerified = true;
  user.VerifyToken = undefined;
  user.VerifyExpiry = undefined;
  await user.save();

  await sendVerified(user.email);

  return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
}
