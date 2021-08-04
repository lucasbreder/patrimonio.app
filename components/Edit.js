import { useRouter } from "next/router";
import Form from "./Form"
import styled from 'styled-components'
import Section from "./Section";
import Title from "./Title";
import Head from "next/head";
import stringTranslate from "../helpers/stringTranslate";

export default function Edit({ data, form, slug }) {

    const path = useRouter();

    return (
        <Section>
            <Head>
                <title>{stringTranslate(slug)} | {process.env.NEXT_PUBLIC_NAME}</title>
            </Head>
            <Title text={`Editar ${stringTranslate(slug)}`} />
            <Form api={`${process.env.NEXT_PUBLIC_API}${path.query.slug}/${path.query.id}`} fields={form} data={data} />
        </Section>
    )
    
}
