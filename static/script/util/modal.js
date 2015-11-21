/**
 * Created by gaowhen on 14/11/27.
 */

define([
    '../lib/zepto',
    '../lib/underscore'
], function(
    $,
    _
) {
    var toastModal = {
        method: function (modal) {
            modal.$modal.addClass('modal').removeClass('m-modal m-modal-m').html(modal.setting.body);
            setTimeout(function () {
                modal.hide();
            }, 2000);
        }
    };

    var alertModal = {
        btn: '<a href="#" class="btn btn-cancel">返回</a>',
        method: function(modal) {
            modal.hide();
        }
    };

    var confirmModal = {
        confirm: {
            btn: '<a href="#" class="btn btn-confirm">确认</a>',
            method: function(modal) {
                modal.hide();
            }
        },
        cancel: {
            btn: '<a href="#" class="btn gray btn-cancel">取消</a>',
            method: function(modal) {
                modal.hide();
            }
        }
    };

    var defaults = {
        isShowHead: false,
        head: 'should be text or dom',
        body: 'text or dom',
        type: 'alert', // confirm
        foot: alertModal
    };

    function Modal() {
        this.init();
    }

    _.extend(Modal.prototype, {
        init: function() {
            this.$overlay = $('<div class="full-screen"></div>');
            this.$modal = $('' +
                '<div class="m-modal m-modal-m">' +
                '<div class="m-m-header"></div>' +
                '<div class="m-m-body" style="text-align: center;"></div>' +
                '<div class="m-m-footer"><div class="btn-box"></div></div>' +
                '</div>');

            this.$head = this.$modal.find('.m-m-header');
            this.$body = this.$modal.find('.m-m-body');
            this.$foot = this.$modal.find('.m-m-footer');
            this.$btn = this.$foot.find('.btn-box');

            this.$overlay.hide();
            this.$modal.hide();

            this.speed = 150;

            var $body = $('body');
            $body.append(this.$overlay);
            $body.append(this.$modal);

            this.$overlay.on('click', function(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }
                // that.hide();
            });
        },
        setHead: function(head) {
            this.$head.removeClass('empty').html(head);
        },
        setContent: function(content) {
            this.$body.html(content);
        },
        show: function(opt) {
            var that = this;

            opt = _.extend(defaults, opt);

            that.$overlay.show(that.speed);

            if (opt.isShowHead) {
                that.$head.removeClass('empty');
                that.setHead(opt.head);
            } else {
                that.$head.addClass('empty');
            }

            switch (opt.type) {
                case 'alert':
                    if (opt.foot && (opt.foot.btn || opt.foot.method)) {
                        alertModal = _.extend(alertModal, opt.foot);
                    }

                    that.$modal.empty().addClass('m-modal m-modal-m').removeClass('modal')
                        .append(that.$head).append(that.$body).append(that.$foot);

                    that.$body.html(opt.body);

                    that.$btn.empty().append(alertModal.btn);

                    that.$modal.on('click', '.btn-cancel', function(e) {
                        e.preventDefault();
                        alertModal.method(that);
                        that.hide();
                    });
                    break;
                case 'confirm':
                    if (opt.foot && (opt.foot.confirm || opt.foot.cancel)) {
                        confirmModal = _.extend(confirmModal, opt.foot);
                    }

                    that.$modal.empty().addClass('m-modal m-modal-m').removeClass('modal')
                        .append(that.$head).append(that.$body).append(that.$foot);

                    that.$body.html(opt.body);
                    that.$btn.empty().append(confirmModal.cancel.btn).append(confirmModal.confirm.btn);

                    that.$modal.on('click', '.btn-cancel', function(e) {
                        e.preventDefault();

                        that.hide();
                        confirmModal.cancel.method(that);
                    });

                    that.$modal.on('click', '.btn-confirm', function(e) {
                        e.preventDefault();

                        that.hide();
                        confirmModal.confirm.method(that);
                    });
                    break;
                case 'tip':
                    that.$modal.addClass('modal').removeClass('m-modal m-modal-m').html(opt.body);
                    break;
                case 'toast':
                    that.setting = opt;
                    toastModal.method(that);
                    break;
                default:
            }

            if (opt.klas === 'full') {
                this.$modal.removeClass('m-modal-m').addClass('m-modal-full');
            }

            that.$modal.show(that.speed);
        },
        hide: function() {
            this.$overlay.remove();
            this.$modal.remove();
        }
    });

    return Modal;

});
