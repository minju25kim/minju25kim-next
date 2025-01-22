import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { htmlContent } = body;
    if (!htmlContent) {
      return NextResponse.json(
        { error: "No HTML content provided" },
        { status: 400 }
      );
    }
    const fullHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          /* Remove all shadow utilities from Tailwind */
          .shadow-sm, .shadow, .shadow-md, .shadow-lg, .shadow-xl, .shadow-2xl {
            box-shadow: none !important;
          }
          /* If you're using custom shadows */
          * {
            box-shadow: none !important;
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
      width: 1200,
      height: 1000,
      deviceScaleFactor: 1,
    });

    await page.emulateMediaType("screen");

    await page.setContent(fullHtml, {
      waitUntil: ["domcontentloaded", "networkidle0"],
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });
    await page.setContent(htmlContent);

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=generated.pdf",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};
