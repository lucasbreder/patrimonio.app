import Head from "next/head";
import { useRouter } from "next/router";
import stringTranslate from "../helpers/stringTranslate";
import Form from "./Form"
import Section from "./Section";
import Title from "./Title";

export default function Create({ form, slug }) {

    const path = useRouter();

    return (
        <Section>
             <Head>
                <title>{stringTranslate(slug)} | {process.env.NEXT_PUBLIC_NAME}</title>
            </Head>
            <Title text={`Adicionar ${stringTranslate(slug)}`} />
            <Form api={`${process.env.NEXT_PUBLIC_API}${path.query.slug}`} fields={form} type="create" />
        </Section>
    )
    
}