import { Helmet } from "react-helmet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="mx-auto max-w-2xl">
      <Helmet>
        <title>FAQ - Double Decent</title>
        <meta name="description" content="Frequently Asked Questions page for Double decent superstore" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Do you deliver outside Lagos state?
          </AccordionTrigger>
          <AccordionContent>Nahh, not yet.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Do you give refunds?</AccordionTrigger>
          <AccordionContent>
            Yes. Orders cancelled before products are send out will get refunded
            to the account that made payment
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
