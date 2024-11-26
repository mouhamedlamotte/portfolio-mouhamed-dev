import About from "./about"
import { Contacts } from "./contacts"
import Experience from "./experience"
import { Footer } from "./footer"
import { HomeHero } from "./hero"
import Layout from "./layout"
import { RecentProjects } from "./recent-projects"

export const Portfolio = () => {
    return (
        <Layout>
            <HomeHero />
            <About/>
            <Experience />
            <RecentProjects/>
            <Contacts />
            <Footer />
        </Layout>
    )
}