module FlashManager
  FLASH_NOTICE_KEY = :notice
  FLASH_ERROR_KEY = :error

  def self.included(base)
    base.send :helper_method, :notice_msg, :error_msg
  end

  def notice_msg(msg, now = false)
    flash.now[FLASH_NOTICE_KEY] = msg
    flash.discard(FLASH_NOTICE_KEY) if now
  end

  def error_msg(msg, now = false)
    flash[FLASH_ERROR_KEY] = msg
    flash.discard(FLASH_ERROR_KEY) if now
  end
end