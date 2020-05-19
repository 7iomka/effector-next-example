import { withFork } from "effector-next";
import Document from "next/document";

const enhance = withFork({ debug: true });

export default enhance(Document);
