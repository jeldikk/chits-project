import { createCheetiAction } from "@/actions/cheeti-lu.actions";
import CheetiForm from "@/components/cheeti-lu/cheeti-form.component";
import { CHEETI_END_YEAR } from "@/utils/constants";

export default function CreateCheetiPage() {
  return (
    <div className="create-new-cheeti">
      <h1 className="text-3xl">Create New Cheeti Here</h1>
      <CheetiForm />
    </div>
  );
}
