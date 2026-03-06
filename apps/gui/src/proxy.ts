import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const proxy = async (request: NextRequest): Promise<NextResponse> => {
  const response = NextResponse.next();
  
  // 1. Check if locale cookie exists
  const hasLocale = request.cookies.has('NEXT_LOCALE');
  
  if (!hasLocale) {
    // 2. Detect language from headers
    const acceptLanguage = request.headers.get('accept-language') || '';
    const isCzech = acceptLanguage.toLowerCase().includes('cs');
    const detectedLocale = isCzech ? 'cs' : 'en';
    
    // 3. Set cookie for subsequent requests
    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
  }
  
  return response;
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export default proxy;
