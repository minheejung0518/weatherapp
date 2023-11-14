import Image from 'next/image'
import { Inter } from 'next/font/google'
import Weather from '@/components/Weather'
import WeatherButton from '@/components/WeatherButton'
import WeatherBox from '@/components/WeatherBox'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Weather>
      <WeatherBox></WeatherBox>
      <WeatherButton></WeatherButton>
    </Weather>
    </>
  )
}
