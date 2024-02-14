import { Logo } from '@rainbow-husky/common-ui'

interface MagicLinkEmailProps {
  firstTime?: boolean,
  token: string
}

export const MagicLinkEmail = ({ firstTime = false, token }: MagicLinkEmailProps) => {
  return (
    <div className="flex items-center justify-center flex-col mt-5 p-5">
      <section className="max-w-2xl mx-auto border border-plum-jam">
        <header className="py-8 flex justify-center w-full">
          <a href="#">
            <Logo className='m-auto' />
          </a>
        </header>
        <div className="text-center mt-10 flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">
            Your SoVote login magic link
          </h1>
        </div>
        <main className="mt-8 px-5 sm:px-10">
          <h3>
            Hey <span className="font-bold">John Deo</span>!
          </h3>
          <br />
          <h2>
            Here's your SoVote login magic link as requested. If you didn't initiate the login, please ignore this email or <a href='https://sovote.com/register-breakin-attempt'>Click Here</a> to let us know.
          </h2>
          <br />
          <p>
            Otherwise, if do want to log in then click the link below.
          </p>
          <br />
          <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/login/complete/${token}`} className='block text-center w-full bg-plum-jam rounded p-4'>
              Magic Link
          </a>
          <p className="mt-8 text-gray-600">
            Thank you, <br />
            SoVote Team
          </p>
        </main>

        <footer className="mt-8">
          <div className="bg-gray-300/60 h-[200px] flex flex-col gap-3 justify-center items-center">
            <div className="text-center flex flex-col gap-2">
              <h1 className="text-mauvewood font-semibold tracking-wide text-lg">
                Get in touch
              </h1>
              <a
                href="mailto:hi@sovote.com"
                className="text-gray-500"
                title="hi@sovote.com"
              >
                hi@sovote.com
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <a href="#_">
                <MastodonIcon />
              </a>
            </div>
          </div>
          <div className="bg-skipper-blue text-black-howl py-5 text-white text-center">
            <p className="mt-3 ">
              © {new Date().getFullYear()} SoVote. All Rights Reserved.
            </p>
          </div>
        </footer>
      </section>
    </div>
  );
};

const MastodonIcon = () => {
  return <svg className='fill-skipper-blue'
    width="74" height="79" viewBox="0 0 74 79" xmlns="http://www.w3.org/2000/svg">
    <path d="M73.7014 17.4323C72.5616 9.05152 65.1774 2.4469 56.424 1.1671C54.9472 0.950843 49.3518 0.163818 36.3901 0.163818H36.2933C23.3281 0.163818 20.5465 0.950843 19.0697 1.1671C10.56 2.41145 2.78877 8.34604 0.903306 16.826C-0.00357854 21.0022 -0.100361 25.6322 0.068112 29.8793C0.308275 35.9699 0.354874 42.0498 0.91406 48.1156C1.30064 52.1448 1.97502 56.1419 2.93215 60.0769C4.72441 67.3445 11.9795 73.3925 19.0876 75.86C26.6979 78.4332 34.8821 78.8603 42.724 77.0937C43.5866 76.8952 44.4398 76.6647 45.2833 76.4024C47.1867 75.8033 49.4199 75.1332 51.0616 73.9562C51.0841 73.9397 51.1026 73.9184 51.1156 73.8938C51.1286 73.8693 51.1359 73.8421 51.1368 73.8144V67.9366C51.1364 67.9107 51.1302 67.8852 51.1186 67.862C51.1069 67.8388 51.0902 67.8184 51.0695 67.8025C51.0489 67.7865 51.0249 67.7753 50.9994 67.7696C50.9738 67.764 50.9473 67.7641 50.9218 67.7699C45.8976 68.9569 40.7491 69.5519 35.5836 69.5425C26.694 69.5425 24.3031 65.3699 23.6184 63.6327C23.0681 62.1314 22.7186 60.5654 22.5789 58.9744C22.5775 58.9477 22.5825 58.921 22.5934 58.8965C22.6043 58.8721 22.621 58.8505 22.6419 58.8336C22.6629 58.8167 22.6876 58.8049 22.714 58.7992C22.7404 58.7934 22.7678 58.794 22.794 58.8007C27.7345 59.9796 32.799 60.5746 37.8813 60.5733C39.1036 60.5733 40.3223 60.5733 41.5447 60.5414C46.6562 60.3996 52.0437 60.1408 57.0728 59.1694C57.1983 59.1446 57.3237 59.1233 57.4313 59.0914C65.3638 57.5847 72.9128 52.8555 73.6799 40.8799C73.7086 40.4084 73.7803 35.9415 73.7803 35.4523C73.7839 33.7896 74.3216 23.6576 73.7014 17.4323ZM61.4925 47.3144H53.1514V27.107C53.1514 22.8528 51.3591 20.6832 47.7136 20.6832C43.7061 20.6832 41.6988 23.2499 41.6988 28.3194V39.3803H33.4078V28.3194C33.4078 23.2499 31.3969 20.6832 27.3894 20.6832C23.7654 20.6832 21.9552 22.8528 21.9516 27.107V47.3144H13.6176V26.4937C13.6176 22.2395 14.7157 18.8598 16.9118 16.3545C19.1772 13.8552 22.1488 12.5719 25.8373 12.5719C30.1064 12.5719 33.3325 14.1955 35.4832 17.4394L37.5587 20.8853L39.6377 17.4394C41.7884 14.1955 45.0145 12.5719 49.2765 12.5719C52.9614 12.5719 55.9329 13.8552 58.2055 16.3545C60.4017 18.8574 61.4997 22.2371 61.4997 26.4937L61.4925 47.3144Z" fill="inherit"/>
  </svg>
}
