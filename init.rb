require 'flash_manager'
require 'flash_manager_helper'

ActionController::Base.send(:include, FlashManager)
ActionController::Base.send(:helper, FlashManagerHelper)