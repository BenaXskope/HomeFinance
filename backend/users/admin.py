from django.contrib import admin
from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ("id", "username", "last_name", "first_name", "email", "is_staff", "is_superuser")
    list_display_links = ("username",)
    list_editable = ("is_staff", "is_superuser")

    fieldsets = (
        (None, {
            "fields": (("email", "username", "password"),)
        }),
        (None, {
            "fields": (("last_name", "first_name"),)
        })
    )

    def get_user(self, obj):
        return obj.user.email

    get_user.short_description = "Пользователь"