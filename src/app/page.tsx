import Slots from '@/components/Slots';
import WagmiConfigWrapper from '@/components/WagmiConfig';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <main className="text-xl text-center mx-auto flex flex-col gap-4 mt-12">
      <h1 className="text-3xl font-semibold text-center mx-auto flex py-2 px-2">
        The Infinite Story Machine
      </h1>
      <WagmiConfigWrapper>
        ,<div className='absolute right-8 top-8'><ConnectButton></ConnectButton></div>
        <Slots />
      </WagmiConfigWrapper>
    </main>
  );
}
