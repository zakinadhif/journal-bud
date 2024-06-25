import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <main className="container">
      <section className="mt-24">
        <h1 className="text-3xl font-bold">
          Hello Zaki Nadhif!
        </h1>
        <p className="text-muted-foreground tracking-wide">How are you feeling today?</p>
      </section>
      <section className="mt-8">
        <Input className="border-0 border-b" />
      </section>
      <section className="grid grid-cols-2 mt-12 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Feeling grateful about something?</CardTitle>
            <CardDescription>Let&apos;s write it down so it can be a memory of yours forever.</CardDescription>
          </CardHeader>
          <CardContent>

          </CardContent>
          <CardFooter>

          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Having a problem ?</CardTitle>
            <CardDescription>Discuss it with me, we&apos;ll figure it out together.</CardDescription>
          </CardHeader>
          <CardContent>

          </CardContent>
          <CardFooter>

          </CardFooter>
        </Card>
      </section>
    </main>
  )
}