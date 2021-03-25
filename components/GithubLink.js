const SHOW_GITHUB_LINKS = true; // could be disabled to discourage users to learn to use github or make their app LEL

const GithubLink = ({ url, ...props }) =>
  SHOW_GITHUB_LINKS ? (
    <a
      href={`https://github.com${url.replace("https://github.com", "")}`}
      target="_new"
      {...props}
    />
  ) : null;

export default GithubLink;
