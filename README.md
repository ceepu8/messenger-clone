This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Used Technologies

- TypeScript
- ReactJS - NextJS v.13 (js framework)
- MongoDB (database)
- Prisma (connection with database)
- Zustand (state management)
- Pusher - pusherjs (real-time)
- next-cloudinary (image storage)
- Tailwind CSS/ react-icons/ react-hot-toast - react-select - react-spinners (stylings)

- clsx - lodash - date-fns
- bcrypt

## Deploy

- [Smoky Messenger Clone](https://smoky-messenger-clone.vercel.app/)

## Prisma

- Setup Prisma in NextJS app (/libs/prismadb.ts)

```
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
```

- Sample Prisma Schema Model (/prisma/schema.prisma)

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  email     String   @unique
  name      String?
}
```

## Next Cloudinary

```
import { CldUploadButton } from "next-cloudinary";


    const handleUpload = (result: any) => {
        // image URL: result?.info?.secure_url
        // logic code...
    };

    <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="zw2rml5a"
    >
         <Button disabled={isLoading} secondary type="button">
           Change
         </Button>
    </CldUploadButton>
```

uploadPreset là một khái niệm đặc thù của Cloudinary. Nó đại diện cho một tập hợp các thiết lập tải lên được định trước mà bạn có thể tạo và cấu hình trong tài khoản Cloudinary của bạn. Upload preset cho phép bạn xác định và tái sử dụng một tập hợp nhất quán các tùy chọn cho việc tải lên các tệp tin khác nhau, giúp đơn giản hóa quy trình chỉ định cài đặt tải lên mỗi khi bạn tải lên một tệp tin.

![plot](./images/next-cloudinary-upload-preset.png)

![plot](./images/next-cloudinary-preview.png)

## Zustand

Zustand là một thư viện quản lý trạng thái dễ sử dụng cho ứng dụng React. Nó giúp bạn quản lý và chia sẻ dữ liệu trạng thái giữa các thành phần một cách đơn giản và linh hoạt. Với Zustand, bạn có thể tạo các store để lưu trữ trạng thái và sử dụng các hooks để truy cập và cập nhật trạng thái đó. Thay vì sử dụng các khái niệm phức tạp như Redux, Zustand cung cấp một cách tiếp cận gọn nhẹ và dễ hiểu hơn để quản lý trạng thái trong ứng dụng React của bạn.

- useActive hook

```
import { create } from "zustand";

interface ActiveListStore {
  members: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (ids: string[]) => void;
}

const useActiveList = create<ActiveListStore>((set) => ({
  members: [],
  add: (id) => set((state) => ({ members: [...state.members, id] })),
  remove: (id) =>
    set((state) => ({
      members: state.members.filter((memberId) => memberId !== id),
    })),
  set: (ids) => set({ members: ids }),
}));

export default useActiveList;
```

- create<ActiveListStore>((set) => ({...})): Hàm create nhận vào một callback function nhận vào một hàm set. Callback này được sử dụng để cung cấp các hàm để thay đổi trạng thái của store.
- Callback function này trả về một object đại diện cho trạng thái ban đầu của store và các hàm để thay đổi trạng thái.
- Trong trường hợp này, trạng thái ban đầu của store (members) được đặt là một mảng rỗng.
  Các hàm add, remove, và set sử dụng hàm set để cập nhật trạng thái của store dựa trên trạng thái hiện tại.
