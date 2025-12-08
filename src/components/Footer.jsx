import Link from "next/link";

export default function Footer() {
  return (
            <footer className="w-full flex flex-col pt-12 bg-primary text-white">
          <div className="flex px-24 pb-12 gap-8 justify-between">
            <h2 className="flex-1 text-3xl font-semibold font-rose text-white">
              ticken
            </h2>

            <div className="flex flex-col gap-2">
              <h6 className="text-lg font-medium">Item Title</h6>

              <Link href={""}>Link</Link>
              <Link href={""}>Link</Link>
              <Link href={""}>Link</Link>
              <Link href={""}>Link</Link>
            </div>

            <div className="flex flex-col gap-2">
              <h6 className="text-lg font-medium">Item Title</h6>

              <Link href={""}>Link</Link>
              <Link href={""}>Link</Link>
              <Link href={""}>Link</Link>
              <Link href={""}>Link</Link>
            </div>
          </div>

          <div className="w-full flex px-24 py-6 justify-between items-center border-t border-white">
            <div className="flex gap-4">
              <div className="size-8 rounded-full bg-white"></div>
              <div className="size-8 rounded-full bg-white"></div>
              <div className="size-8 rounded-full bg-white"></div>
            </div>

            <h6 className="text-white font-medium">&copy;2025. Ticken.</h6>
          </div>
        </footer>
  )
}