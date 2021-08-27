$(document).ready(function() {
  
    $(".ui.form").form({
        on: 'blur',
        inline: true,
      fields: {
          url: {
            identifier: "url",
            rules: [
              {
                type: "url",
                prompt: "Please enter a url"
              }
            ]
          },

          path: {
            identifier: "path",
            rules: [
              {
                type: "regExp[^[a-zA-Z0-9_.-]*$]",
                prompt: "URL path is invalid (a-z, A-Z, 0-9, -, _)"
              }
            ]
          },
      }
    });
  });