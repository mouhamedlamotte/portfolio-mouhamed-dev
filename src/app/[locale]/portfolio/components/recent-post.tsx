/* eslint-disable @typescript-eslint/no-explicit-any */
import AnimatedShinyText from "@/app/[locale]/components/ui/animated-shiny-text"
import { Button } from "@/app/[locale]/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Section } from "./section"
import BlogCard from "./cards/blog-card"
import { fetchPages } from "@/lib/notion"
import { formatDate } from "@/lib/utils"
import { getScopedI18n } from "@/locales/server"


export const RecentPost = async () => {

  const posts = await fetchPages()

  const t = await getScopedI18n("landing.recent_posts")
  const common = await getScopedI18n("landing.common")
  

  return (
    <Section>
   <div className="w-full  max-auto">
      <div className="flex  items-start">
        <div>
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
            {t("title")}
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
            {t("subtitle")}
        </p>
        </div>
            <Button variant="link" className="ml-auto  hover:text-muted-foreground">
              <AnimatedShinyText className="inline-flex items-center" >
              <Link prefetch={true} href="/portfolio/blog" className="hover:underline-none" >
              {common("see_more")}
              </Link>
              <ArrowRight className="ml-2" size={16} />
              </AnimatedShinyText>
            </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {
          posts.slice(0, 3).map((post: any) => (
            <div key={post.id}>
            <BlogCard
                href={`/portfolio/blog/${post.properties?.slug?.rich_text[0]?.plain_text}`}
                key={post.id}
                imageUrl={post.properties?.thumb?.rich_text[0]?.text?.content ?? "/placeholder.svg"}
                title={post.properties?.title?.title[0]?.plain_text}
                excerpt={post.properties?.excerpt?.rich_text[0]?.plain_text}
                author={{
                  name: "Mouhamed Lamotte",
                  avatarUrl: "/me.jpeg",
                }}
                date={formatDate(post.created_time)}
              />

            </div>
            
          ))
        }
      </div>
    </div>
  </Section>
  )
}


