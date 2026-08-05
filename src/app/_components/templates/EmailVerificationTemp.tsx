import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface EmailVerificationProps {
  userName?: string;
  verificationUrl: string;
  brandName?: string;
}

export default function EmailVerificationTemp({
  verificationUrl,
  brandName = "AudioStore",
}: EmailVerificationProps) {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto my-8 max-w-2xl rounded-lg bg-white shadow-lg">
            {/* Header */}
            <Section className="rounded-t-lg bg-blue-600 py-8 text-center text-white">
              <Text className="m-0 text-2xl font-bold">{brandName}</Text>
              <Text className="mt-2 mb-0 text-blue-100">
                Premium Audio Equipment
              </Text>
            </Section>

            {/* Content */}
            <Section className="px-8 py-6">
              <Text className="mb-4 text-xl font-semibold text-gray-900">
                Welcome!
              </Text>

              <Text className="mb-6 leading-relaxed text-gray-700">
                Thanks for joining {brandName}! To complete your registration
                and start exploring our premium audio collection, please verify
                your email address.
              </Text>

              {/* Verification Button */}
              <Section className="my-8 text-center">
                <Button
                  href={verificationUrl}
                  className="text-decoration-none inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="mb-4 text-sm text-gray-600">
                This link expires in 10 minutes for security.
              </Text>

              <Text className="mb-2 text-sm text-gray-500">
                Can&apos;t click the button? Copy this link:
              </Text>

              <Text className="mb-6 text-xs break-all text-blue-600">
                <a
                  href={verificationUrl}
                  className="text-blue-600"
                  target="_blank"
                >
                  {verificationUrl}
                </a>
              </Text>

              <div className="border-t border-gray-200 pt-4">
                <Text className="m-0 text-sm text-gray-600">
                  Need help? Contact us at{" "}
                  <Link
                    href="mailto:support@audiostore.com"
                    className="text-blue-600"
                  >
                    support@audiostore.com
                  </Link>
                </Text>
              </div>
            </Section>

            {/* Footer */}
            <Section className="rounded-b-lg bg-gray-100 px-8 py-4 text-center">
              <Text className="m-0 text-xs text-gray-500">
                © {new Date().getFullYear()} {brandName} • All rights reserved
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
