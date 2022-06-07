import e from 'express';

export async function createUser(req: e.Request, res: e.Response) {
  console.log('create user service hit');
}

export async function nativeLogin() {
  console.log('login user service hit');
}
