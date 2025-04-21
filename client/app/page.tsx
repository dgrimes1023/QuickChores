"use client";
import Header from "@/components/ui/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useGlobalContext } from "@/context/globalContext";
import Link from 'next/link';
import { Briefcase, Building, Users, Search, Hammer, HelpingHand, ShieldCheck, CheckCircleIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";


export default function Home() {

  const features = [
    {
      icon: <Hammer className="h-6 w-6 text-[#7263f3]" />,
      title: "Chores That Fit Your Life",
      description: "Pick up flexible tasks that match your schedule, skills, and interests — no experience needed.",
      benefits: [
        "Browse by location or category",
        "Work when you want",
        "Get paid quickly and securely",
      ],
      cta: "Find Chores",
      ctaLink: "/findchores",
    },
    {
      icon: <HelpingHand className="h-6 w-6 text-[#7263f3]" />,
      title: "Help When You Need It",
      description: "Whether it's yardwork, cleaning, or a last-minute grocery run — find reliable help fast.",
      benefits: [
        "Post tasks in under a minute",
        "Transparent pricing and reviews",
        "Verified local helpers",
      ],
      cta: "Post a Chore",
      ctaLink: "/post-chore",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-[#7263f3]" />,
      title: "A Trusted Community",
      description: "We’re building a network of dependable neighbors ready to lend a hand.",
      benefits: [
        "Real reviews from real people",
        "Secure messaging and payments",
        "Support for any type of chore",
      ],
      cta: "Join the Community",
      ctaLink: "/signup",
    },
  ];


  return (
    <main>
      <Header />

      <section className=" py-20 bg-gradient-to-b from-[#d7dedc] to-[#7263f3]/5 text-primary-foreground">
        <div className="container mx-auto px-4 text-center text-black">
          <h1 className="text-4xl text-[#7263f3] md:text-5xl font-bold mb-6">
            Busy? Post a task. Need cash? Complete one.
          </h1>
          <p className="text-xl mb-8">
            Connect with people in your area who need help with tasks, and get paid for your time.
          </p>
          <div className="max-w-2xl mx-auto flex gap-4">
            <Input
              type="text"
              placeholder="Search for tasks..."
              className="flex-grow bg-white text-black"
            />
            <Button className="bg-[#7263f3] text-white hover:bg-[#7263f3]/80">
              <Search className="h-6 w-6" />
              Search Chores
            </Button>
          </div>

        </div>
      </section>

      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose{" "}
            <span className="text-[#7263f3] font-extrabold">QuickChores?</span>
          </h2>

          <div className="grid grid cols-1 md:grid-cols-3 gap-8">
            {
              features.map((feature, index) => (
                <Card
                  key={index}
                  className="flex flex-col h-full rounded-xl border-none">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl mb-2">
                      {feature.title}
                    </CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={feature.ctaLink}> {feature.cta} </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>

          <div className="mt-12 text-center">
            <Badge
              variant={"outline"} className="text-sm font-medium border-gray-400">
              Trusted by 100,000+ Busy Users Worldwide!
            </Badge>
          </div>
        </div>
      </section>

      <section className="py-[4rem] bg-gray-300 w-full">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>

          <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button size={"lg"} asChild>
                <Link href={"/chores"} className="text-[#7263f3]">
                  Find Chores
                </Link>
              </Button>
              <Button size={"lg"} variant={"outline"} asChild>
                <Link href={"/post-chore"} className="text-[#7263f3]">
                  Post a Chore
                </Link>
              </Button>
          </div>


        </div>
      </section>

      <Footer />
    </main>
  );
}
