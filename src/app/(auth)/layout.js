

export const generateMetadata = () => {
  return {
    title: "manoj",
    description: "A simple Next.js application for managing a user's profile",
  };}

export default function authLayout({ children }) {
  return (

      <div>
      <h1> Create Next App manoj </h1>
        {children}
      </div>

  );
}
