import Image from "next/image";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/images/logo.svg"
      alt="SoVote"
      className={className || 'flex-none'}
      width={63}
      height={63}
      priority
    />
  )
}
