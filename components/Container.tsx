interface ContainerProps {
  children: React.ReactNode;
}
const Container = (props: ContainerProps) => {
  return (
    <div className="max-w-[1920px] mx-auto xl:px-20 md:px-2 px-4">
      {props.children}
    </div>
  );
};

export default Container;
