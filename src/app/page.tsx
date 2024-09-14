import Feed from "@/components/Feed";
import "@/libs/langchain";

export default function Home() {
  return (
    <div className="min-h-screen py-4">
      <main className="flex flex-col gap-8 items-center">
        <div className="flex w-100 items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z"></path></svg>
        </div>
        <Feed /> 
      </main>
    </div>
  );
}


