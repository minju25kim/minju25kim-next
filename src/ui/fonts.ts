import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/pretendard/Pretendard-Bold.woff',
      weight: '800',
    },
    {
      path: '../../public/fonts/pretendard/Pretendard-Bold.woff',
      weight: '700',
    },
    {
      path: '../../public/fonts/pretendard/Pretendard-SemiBold.woff',
      weight: '600',
    },
    {
      path: '../../public/fonts/pretendard/Pretendard-Medium.woff',
      weight: '500',
    },
    {
      path: '../../public/fonts/pretendard/Pretendard-Regular.woff',
      weight: '400',
    },
    {
      path: '../../public/fonts/pretendard/Pretendard-Light.woff',
      weight: '300',
    },
    {
      path: '../../public/fonts/pretendard/Pretendard-ExtraLight.woff',
      weight: '200',
    },
    {
      path: '../../public/fonts/pretendard/Pretendard-Thin.woff',
      weight: '100',
    },
  ],
  display: 'swap',
});