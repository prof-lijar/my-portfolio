import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

import { Posts } from "./definition";

export async function fetchBlogPosts() {
  noStore();

  try {
    const data = await sql<Posts>`select * from blog order by id desc`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch blog posts data.");
  }
}

export async function fetchBlogById(id: string) {
  noStore();
  console.log(id);
  try {
    const data = await sql<Posts>`
            select * from blog where id = ${id};
        `;

    return data.rows[0];
  } catch (error) {
    console.log(id);
    console.error("Database Error:", error);
    throw new Error("Failed to fetch bblog");
  }
}
