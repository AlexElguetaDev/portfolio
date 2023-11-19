"use client";

import Image from "next/image";
import lolo from "@/public/loloicon.png";
import personal from "@/public/personalphoto.png";
import personal2 from "@/public/personal2.png";
import { FaReact, FaVuejs, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiPrisma, SiNextdotjs, SiPostgresql, SiGraphql } from "react-icons/si";
import { ChannelLink } from "./components/molecules";

export default function Home() {
  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-700 flex items-center justify-center">
      <div className="space-y-2 md:space-x-5">
        <div className="items-center space-y-2 xl:grid xl:grid-cols-1">
          <div className="flex flex-col items-center sm:flex-row gap-5 xl:pt-10 sm:pt-5">
            <ChannelLink
              name="AlexElguetaDev"
              link="https://github.com/AlexElguetaDev"
              img={personal}
              icon={<FaGithub className="text-black" />}
              text="64 repositorios"
            />
            <ChannelLink
              name="@alexelguetar"
              link="https://www.linkedin.com/in/alexelguetar"
              img={personal2}
              icon={<FaLinkedin className="text-black" />}
              text="537 seguidores"
            />
          </div>
          <div className="prose max-w-none prose-lg pt-4 dark:prose-invert xl:col-span-2 font-light text-base">
            <p>
              ¡Saludos a todos! 👋 Soy Alex, un apasionado desarrollador Full
              Stack de 27 años que reside en Chile.
            </p>
            <p>
              Mi fascinación por construir aplicaciones integrales con
              <a
                href="https://react.dev"
                target="_blank"
                className="border mr-1 ml-1 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
              >
                <FaReact className="text-[#01FFFF] mr-1" />
                React
              </a>
              va más allá de la superficie, complementándose con mi interés
              apasionado por explorar las complejidades del backend. A través de
              mi experiencia en
              <a
                href="https://www.lolocar.app"
                target="_blank"
                className="border ml-1 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
              >
                <Image
                  className="mr-1 mt-0 mb-0"
                  src={lolo}
                  alt="logo-lolo"
                  width={25}
                />
                Lolocar
              </a>
              , he cultivado un profundo aprecio por
              <a
                href="https://vuejs.org"
                target="_blank"
                className="border mr-1 ml-1 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
              >
                <FaVuejs className="text-[#3EB27F] mr-1" />
                Vue
              </a>
              y me he sumergido con entusiasmo en el emocionante universo del
              desarrollo móvil de la mano de
              <a
                href="https://reactnative.dev"
                target="_blank"
                className="border ml-1 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
              >
                <FaReact className="text-[#01FFFF] mr-1" />
                React Native
              </a>
              .
            </p>
            <p>
              Además, exploro a fondo las tecnologías
              <a
                href="https://graphql.org/"
                target="_blank"
                className="border ml-1 mr-1 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
              >
                <SiGraphql className="text-[#DD34A6] mr-1" />
                GraphQL
              </a>
              y
              <a
                href="https://www.postgresql.org/"
                target="_blank"
                className="border ml-1 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
              >
                <SiPostgresql className="text-[#31648C] mr-1" />
                PostgreSQL
              </a>
              . Estas tecnologías desempeñan un papel crucial en la optimización
              y manejo eficiente de datos para proporcionar una experiencia
              excepcional.
            </p>
            <p>
              Últimamente, me he sentido fascinado por el uso de
              <a
                href="https://nextjs.org"
                target="_blank"
                className="border mr-1 ml-1 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
              >
                <SiNextdotjs className="text-black dark:text-white mr-1" />
                Next.js
              </a>
              y
              <a
                href="https://www.prisma.io/"
                target="_blank"
                className="border ml-1 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
              >
                <SiPrisma className="text-black dark:text-white mr-1" />
                Prisma
              </a>
              . Estoy explorando estas tecnologías con entusiasmo y estoy
              emocionado por aprender más sobre cómo pueden mejorar mis
              habilidades de desarrollo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
