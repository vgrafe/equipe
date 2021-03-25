import Progress from "./Progress";

const PageHeader = ({ subheading, heading, progress, url }) => (
  <>
    <div className="flex items-end">
      <div>
        <p className="opacity-75">{subheading}</p>
        {url ? (
          <a href={url} target="_blank">
            <h1 className="text-3xl">{heading}</h1>
          </a>
        ) : (
          <h1 className="text-3xl">{heading}</h1>
        )}
      </div>
      <div className="flex-grow" />
      <div className="text-right">
        <Progress value={progress} />
      </div>
    </div>
    <hr className="my-4" />
  </>
);

export default PageHeader;
