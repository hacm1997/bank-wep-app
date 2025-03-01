/** @type {import('next').NextConfig} */

import withPWA from "next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

module.exports = withPWA({
  ...nextConfig,
  dest: "public",
  // disable: true, // process.env.NODE_ENV === "development",
});
