import Image from "next/image";
import { cx } from "../ui";

export function Logo({ eager, className }: { eager?: boolean; className?: string }) {
  return (
    <Image
      src="/payserve-logo.png"
      alt="PayServe"
      width={469}
      height={126}
      loading={eager ? "eager" : undefined}
      className={cx("h-11 w-auto", className)}
    />
  );
}
