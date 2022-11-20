"use strict";

jQuery(() => {
  $("#mobile-menu").hide();

  $("#close-button").on("click", () => {
    $("#mobile-menu").fadeOut("fast");
  });

  $("#open-button").on("click", () => {
    $("#mobile-menu").fadeIn("fast");
  });
});
