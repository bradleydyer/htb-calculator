require 'compass/import-once/activate'
# Require any additional compass plugins here.

# sass-globbing - whole folder imports
require 'sass-globbing'
# breakpoints - fancy breakpoints
require 'breakpoint'

# Set this to the root of your project when deployed:
http_path = "/web"
css_dir = "/web/htb/css"
sass_dir = "/web/htb/sass"
images_dir = "/web/htb/images"
javascripts_dir = "/web/js"
relative_assets = true

output_style = :expanded
environment = :development

relative_assets = true
#sass_options = {:debug_info=>false}

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
