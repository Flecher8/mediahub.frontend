import Link from "next/link";
import RegistrationForm from "./form";

export default async function RegisterPage() {
  return (
    <>
      <div className="flex items-center justify-center h-full">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center text-3xl">Register</h2>
            <RegistrationForm />
            <p className="text-center mt-4">
              Already registered?{" "}
              <Link href="/login" className="text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
