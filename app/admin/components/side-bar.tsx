"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminDashboardLinks } from "@/constant/dasboardlinks";
import { P, Span } from "@/components/ui/typography";

function AdminSideNav() {
  const pathname = usePathname();

  return (
    <div className="w-full bg-[#EEEEEE] h-full">
      <div className="h-44 flex px-4 py-8  justify-center">
        <svg
          width="203"
          height="23"
          viewBox="0 0 203 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M184.771 22.3011H192.809L203 10.6905L190.997 -3.05176e-05H182.953L194.955 10.6905L184.771 22.3011Z"
            fill="#4CAD50"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M174.994 22.3011H183.039L193.223 10.6905L181.22 -3.05176e-05H173.182L185.185 10.6905L174.994 22.3011Z"
            fill="#FEA000"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M165.222 22.3011H173.26L183.444 10.6905L171.441 -3.05176e-05H163.404L175.406 10.6905L165.222 22.3011Z"
            fill="#F40057"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.19754 22.1377H11.6177L13.8928 5.57761H21.9446L22.6863 0.15744H0.741708L0 5.57761H8.47258L6.19754 22.1377Z"
            fill="#030803"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M25.9528 0.278189L22.9646 22.0231H28.5203L29.5972 14.1638H40.8012L39.7243 22.0231H45.0946L45.8292 16.6742L42.1991 12.4664L46.9917 8.25155L47.7048 3.03107L45.3299 0.271057H25.9528V0.278189ZM30.3603 9.63512L30.8025 5.39169H42.0065L41.5643 9.63512H30.3603Z"
            fill="#030803"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M70.4621 21.8945L73.0296 3.18777L70.619 0.399231H54.1374L50.9566 3.1949L48.3892 21.8945H54.1303L55.0217 15.3974H65.8122L64.9207 21.8945H70.455H70.4621ZM67.1957 5.37723L66.5253 10.2411H55.7349L56.4053 5.37723H67.1957Z"
            fill="#030803"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M94.5957 8.62225H80.9312L81.3733 5.39867H97.6624L98.3542 0.342224H79.2694L76.3454 2.92394L73.728 21.9516H79.0983L80.2251 13.7429H93.8896L94.5957 8.62225Z"
            fill="#030803"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M150.225 8.73635H139.271L140.405 0.477722H135.12L132.189 21.8232H137.474L138.558 13.9354H149.512L148.428 21.8232H153.713L154.44 16.5314L149.876 11.2396L149.797 11.1469L149.904 11.0542L155.916 5.76952L156.644 0.477722H151.359L150.225 8.73635Z"
            fill="#030803"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M119.529 8.62225H105.864L106.306 5.39867H122.596L123.287 0.342224H104.21L101.279 2.92394L98.6683 21.9516H104.031L105.158 13.7429H118.823L119.529 8.62225Z"
            fill="#030803"
          />
          <path
            d="M131.891 0.105164H126.601L123.567 22.1949H128.857L131.891 0.105164Z"
            fill="#030803"
          />
        </svg>
      </div>
      <div className="flex flex-col items-start h-full">
        {AdminDashboardLinks.map((links, id) => {
          const isActive =
            pathname === links.path ||
            (pathname.startsWith(links.path) && links.path !== "/admin");

          return (
            <div
              key={id}
              className="w-full flex items-center justify-center gap-1"
            >
              <Link
                href={links.path}
                className={`w-[90%] p-3 font-semibold flex gap-2 items-center my-3 ${
                  isActive
                    ? "font-medium text-primary bg-black text-white"
                    : "text-black"
                }`}
              >
                <Span>{links.icon}</Span>
                <P className="text-base">{links.title}</P>
              </Link>
              {isActive && (
                <div className="w-[10%]  py-3 h-full flex items-start gap-1">
                  <Span className="h-full w-1 bg-[#F40057] "></Span>
                  <Span className="h-full w-1 bg-[#FEA000] "></Span>
                  <Span className="h-full w-1 bg-[#4CAD50] "></Span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminSideNav;
