module FlashManagerHelper
  # Renders a in page flash container for showing page action errors.
  def response_flash(flash_id)
    content_tag(:div, :id => flash_id, :style => "display: none") do
      content_tag(:div, :class => 'local_flash') do
        link_to_function("hide", "$('#{flash_id}').hide();", :class => 'hide_flash') +
          content_tag("span", "", :class => "notice_msg")
      end
    end
  end

  # Renders the flash message with appropriate styles, depending on whether it
  # is a notice message or an error. It is assumed that the notice and error
  # messages are mutually exclusive and only one of them will be set/displayed
  # in any page.
  #
  # If there's a sublayout, renders the flash properly aligned with the
  # innercontent within the sublayout.
  #
  # ==== Params
  # sublayout ::  if any. Right now, only pages controller has a sublayout.
  #
  def flash_messages(sublayout = nil)
    # CSS class for aligning flash inside sub layout.
    layout_flash_class = "sublayout_#{sublayout}_align" if sublayout

    if flash[:notice]
      flash_class = "success_flash"
    elsif flash[:error]
      flash_class = "error_flash"
    end

    content_tag :div, :id => "flash_container",
      :class => "#{flash_class} #{layout_flash_class} clearfix",
      :style => flash_class.nil? ? 'display:none' : '' do
      flash_content = content_tag :span, flash[:notice] || flash[:error], :class => "notice_msg"

      # 'View item' link at the end of the flash message.
      #
      # For eg.,
      # =>  Message has been posted - <a...>View message</a>
      #
      if flash[:view_item]
        flash_content += " - " + link_to(
          flash[:view_item][:label], flash[:view_item][:link],
          :class => 'flash_view_link')
      end

      flash_content
    end
  end
end
