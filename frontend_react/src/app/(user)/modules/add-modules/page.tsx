"use client";

import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();

	router.push("/modules/add-modules/step-1");

	return null;
}