import LogoAeon from '../../../public/logo.svg'
import Image from 'next/image'
export function Header() {
  return (
    <header className="flex h-28  bg-slate-100 w-full pl-9 border-b border-slate-200 ">
      <Image width={320} height={36} src={LogoAeon} alt="" />
    </header>
  )
}
