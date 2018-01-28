import * as React from "react";
export default ({ children, title }) => {
  return (
    <div className="aspect-ratio--object bg-black-40">
      <article className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4 bg-white">
        <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
          {title}
        </h1>
        <div className="pa3 bt b--black-10">{children}</div>
      </article>
    </div>
  );
};
