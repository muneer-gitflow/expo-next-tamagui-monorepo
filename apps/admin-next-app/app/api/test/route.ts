import { NextResponse } from 'next/server';

export type APIResponse<DataType> = {
  status: 'success' | 'error';
  data?: DataType;
  message?: string;
};

type Data = {
  name: string;
  height: string;
  method: string;
};

export async function GET(req: Request) {
  // session token is located in the request headers

  return NextResponse.json<APIResponse<Data>>({
    status: 'success',
    data: {
      name: 'Luke Skywalker',
      height: '172',
      method: 'GET',
    },
  });
}


export async function POST(req: Request) {
  return NextResponse.json<APIResponse<Data>>({
    status: 'success',
    data: {
      name: 'Luke Skywalker',
      height: '172',
      method: 'POST',
    },
  });
}
