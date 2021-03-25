import Button from "components/Button";
import { useState } from "react";

const StripeTest = () => {
  const [email, setEmail] = useState("");
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch(`/api/purchase`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
            }),
          })
            .then((a) => a.json())
            .then(console.log);
        }}
      >
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button type="submit">submit</Button>
      </form>
    </div>
  );
};
export default StripeTest;
