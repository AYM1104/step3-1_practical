"use client"
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

import createCustomer from './createCustomer';

export default function CreatePage() {
    const formRef = useRef();
    const router = useRouter();

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const formData = new FormData(formRef.current);
    //     await createCustomer(formData);
    //     router.push(`./create/confirm?customer_id=${formData.get("customer_id")}`);
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(formRef.current);
            const customerId = formData.get("customer_id"); // 顧客IDを取得
    
            // 顧客IDが空欄の場合はエラーをスロー
            if (!customerId || customerId.trim() === "") {
                throw new Error("顧客IDが空欄です。入力してください。");
            }
    
            // 顧客データ作成APIを呼び出し
            await createCustomer(formData);
    
            // 確認ページに遷移
            router.push(`./create/confirm?customer_id=${customerId}`);
        } catch (error) {
            // エラーが発生した場合の処理
            console.error("Error creating customer:", error);
            alert(error.message || "エラーが発生しました。再試行してください。");
        }
    };

    return (
        <>
            <div className="card bordered bg-white border-blue-200 border-2 max-w-md m-4">
                <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="card-body">
                            <h2 className="card-title">
                                <p><input type="text" name="customer_name" placeholder="桃太郎" className="input input-bordered" /></p>
                            </h2>
                            <p>Customer ID:<input type="text" name="customer_id" placeholder="C030" className="input input-bordered" /></p>
                            <p>Age:<input type="number" name="age" placeholder="30" className="input input-bordered" /></p>
                            <p>Gender:<input type="text" name="gender" placeholder="女" className="input input-bordered" /></p>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="btn btn-primary m-4 text-2xl">
                                作成
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}



